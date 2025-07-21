// Data object array for practicing destructuring and .map() function
const studentsData = [
    {
        id: 1,
        name: "Alice Johnson",
        age: 22,
        email: "alice.johnson@email.com",
        major: "Computer Science",
        gpa: 3.8,
        address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001"
        },
        courses: ["JavaScript", "React", "Node.js", "Database"],
        skills: {
            programming: ["JavaScript", "Python", "Java"],
            frameworks: ["React", "Express", "Django"],
            databases: ["MongoDB", "PostgreSQL"]
        },
        projects: [
            { name: "E-commerce App", tech: "React", status: "completed" },
            { name: "Chat Application", tech: "Node.js", status: "in-progress" }
        ],
        isActive: true,
        graduationYear: 2024
    },
    {
        id: 2,
        name: "Bob Smith",
        age: 21,
        email: "bob.smith@email.com",
        major: "Web Development",
        gpa: 3.6,
        address: {
            street: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90210"
        },
        courses: ["HTML", "CSS", "JavaScript", "Vue.js"],
        skills: {
            programming: ["JavaScript", "PHP", "C++"],
            frameworks: ["Vue.js", "Laravel", "Bootstrap"],
            databases: ["MySQL", "SQLite"]
        },
        projects: [
            { name: "Portfolio Website", tech: "Vue.js", status: "completed" },
            { name: "Blog Platform", tech: "Laravel", status: "planning" }
        ],
        isActive: false,
        graduationYear: 2025
    },
    {
        id: 3,
        name: "Carol Davis",
        age: 23,
        email: "carol.davis@email.com",
        major: "Data Science",
        gpa: 3.9,
        address: {
            street: "789 Pine Rd",
            city: "Chicago",
            state: "IL",
            zipCode: "60601"
        },
        courses: ["Python", "Machine Learning", "Statistics", "Data Analysis"],
        skills: {
            programming: ["Python", "R", "SQL"],
            frameworks: ["Django", "Flask", "TensorFlow"],
            databases: ["PostgreSQL", "MongoDB", "Redis"]
        },
        projects: [
            { name: "Sales Prediction Model", tech: "Python", status: "completed" },
            { name: "Customer Analytics Dashboard", tech: "Django", status: "in-progress" }
        ],
        isActive: true,
        graduationYear: 2024
    },
    {
        id: 4,
        name: "David Wilson",
        age: 20,
        email: "david.wilson@email.com",
        major: "Mobile Development",
        gpa: 3.7,
        address: {
            street: "321 Elm St",
            city: "Austin",
            state: "TX",
            zipCode: "78701"
        },
        courses: ["Swift", "Kotlin", "React Native", "Flutter"],
        skills: {
            programming: ["Swift", "Kotlin", "Dart", "JavaScript"],
            frameworks: ["React Native", "Flutter", "SwiftUI"],
            databases: ["SQLite", "Firebase", "Realm"]
        },
        projects: [
            { name: "Weather App", tech: "React Native", status: "completed" },
            { name: "Task Manager", tech: "Flutter", status: "in-progress" }
        ],
        isActive: true,
        graduationYear: 2026
    },
    {
        id: 5,
        name: "Emma Brown",
        age: 24,
        email: "emma.brown@email.com",
        major: "UI/UX Design",
        gpa: 3.5,
        address: {
            street: "654 Maple Dr",
            city: "Seattle",
            state: "WA",
            zipCode: "98101"
        },
        courses: ["Design Principles", "Figma", "Adobe Creative Suite", "User Research"],
        skills: {
            programming: ["HTML", "CSS", "JavaScript"],
            frameworks: ["Tailwind CSS", "Bootstrap", "Sass"],
            databases: ["Firebase", "Supabase"]
        },
        projects: [
            { name: "Restaurant Website", tech: "HTML/CSS", status: "completed" },
            { name: "Mobile App Design", tech: "Figma", status: "in-progress" }
        ],
        isActive: false,
        graduationYear: 2023
    }
];

// Export the data for use in other files
export default studentsData;

// Practice Examples (uncomment to test):

// 1. Basic destructuring with .map()
// const studentNames = studentsData.map(({ name, age }) => `${name} (${age} years old)`);
// console.log(studentNames);

// 2. Nested destructuring
// const studentAddresses = studentsData.map(({ name, address: { city, state } }) => 
//     `${name} lives in ${city}, ${state}`
// );
// console.log(studentAddresses);

// 3. Destructuring with default values
// const studentInfo = studentsData.map(({ name, major, gpa = 0.0, isActive = false }) => ({
//     name,
//     major,
//     gpa,
//     status: isActive ? 'Active' : 'Inactive'
// }));
// console.log(studentInfo);

// 4. Array destructuring within objects
// const firstSkills = studentsData.map(({ name, skills: { programming } }) => ({
//     name,
//     primarySkill: programming[0],
//     secondarySkill: programming[1]
// }));
// console.log(firstSkills);

// 5. Complex destructuring with filtering
// const activeStudentProjects = studentsData
//     .filter(({ isActive }) => isActive)
//     .map(({ name, projects }) => ({
//         studentName: name,
//         completedProjects: projects.filter(({ status }) => status === 'completed')
//     }));
// console.log(activeStudentProjects);
