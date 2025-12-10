async function insertStudent() {
    const { data, error } = await supabase
        .from("students")
        .insert([
            { name: "Bob", major: "FTP", gpa: 2.51 },
            { name: "Bell", major: "IMT", gpa: 3.50 }
        ]).select();

    if (error) console.error("Error inserting data:", error);
    else console.log("Data inserted:", data);
}
// insertStudent();

async function getStudents() {
    const { data, error } = await supabase
        .from("students")
        .select("*");
    if (error) console.error("Error fetching data:", error);
    else console.log("Students data:", data);
}
// getStudents();

async function updateStudent() {
    const { data, error } = await supabase
        .from("students")
        .update({ gpa: 3.9 })
        .eq("name", "Lulu")
        .select();

    if (error) console.error("Error updating data:", error);
    else console.log("Data updated:", data);
}
// await updateStudent();

async function deleteStudent() {
    const { data, error } = await supabase
        .from("students")
        .delete()
        .eq("name", "Lala")
        .select();

    if (error) console.error("Error deleting data:", error);
    else console.log("Data deleted:", data);
}
// await deleteStudent();

async function getbyGPAgt3() {
    const { data, error } = await supabase
        .from("students")
        .select("*")
        //gt: greater than
        .gt("gpa", 3.0)
        .order("gpa", { ascending: false });

    if (error) console.error("Error fetching data by GPA:", error);
    else console.log("Students with GPA > 3.0:", data);
}
// getbyGPAgt3();

async function getbyFilterName() {
    const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("name", "Bob")
        .single();

    if (error) console.error("Error fetching data by filter:", error);
    else console.log("Student with name Bob:", data);
}
getbyFilterName();