import { supabase } from '../db.js';

// INSERT
export async function insertStudent(req, res) {
    const { name, major, gpa } = req.body;
    const { data, error } = await supabase
        .from("students")
        .insert([{ name, major, gpa }])
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: "Student added successfully", data });
}

// GET ALL
export async function getStudents(req, res) {
    const { data, error } = await supabase
        .from("students")
        .select("*");

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ data });
}

export async function getStudentById(req, res) {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ data });
}

// UPDATE
export async function updateStudent(req, res) {
    const { name, gpa } = req.body;
    const { data, error } = await supabase
        .from("students")
        .update({ gpa })
        .eq("name", name)
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: "Student updated successfully", data });
}

// DELETE
export async function deleteStudent(req, res) {
    const id = req.params.id;
    const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id)
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: "Student deleted successfully", data });
}

// FILTER GPA > 3.0
export async function getbyGPAgt3(req, res) {
    const { minGPA } = req.query;
    const gpaValue = minGPA || 3.0;

    const { data, error } = await supabase
        .from("students")
        .select("*")
        .gt("gpa", gpaValue)
        .order("gpa", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ data });
}

// FILTER BY NAME
export async function getbyFilterName(req, res) {
    const { name } = req.query;

    const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("name", name)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ data });
}