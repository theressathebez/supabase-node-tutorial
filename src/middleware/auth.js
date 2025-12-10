import { supabaseAuth } from "../db.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer', '');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { data, error } = await supabaseAuth.auth.getUser(token);
    if (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = data.user;
    next();
};