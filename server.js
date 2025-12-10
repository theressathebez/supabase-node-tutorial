import express from 'express';
import cors from 'cors';
import studentRoutes from './src/routes/studentRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './src/db.js';
import authRoutes from './src/routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //state static path ke public

app.use('/api/students', studentRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const clients = [];
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    clients.push(res);
    console.log('Client connected. Total clients:', clients.length);

    req.on('close', () => {
        console.log('Client disconnected.');
        const index = clients.indexOf(res);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    })
});

const channel = supabase
    .channel('realtime-students')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'students' },
        (payload) => {
            console.log('Realtime Event:', payload.eventType)
            console.log('New:', payload.new)
            console.log('Old:', payload.old)

            const data = `data: ${JSON.stringify(payload)}\n\n`;
            clients.forEach((client) => client.write(data));
        }
    )
    .subscribe((status) => {
        console.log('Subscription status:', status);
    }
);