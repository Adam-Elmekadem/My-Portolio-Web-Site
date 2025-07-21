import studentsData from "./Destructuring_data.js";

export default function Students({student}) { //or students({name, age, grade, email, gpa, address: {street, city, state, zipCode}}) {
    console.log(JSON.stringify(student, null, 2)); // Method 3: Use JSON.stringify for complete object structure

    const {name, age, grade, email, gpa, address: {street, city, state, zipCode}} = student;
    const isEven = student.id % 2 === 0; // Example of using a property for conditional logic
    return (
        <>
            {isEven && <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{student.id} {name}</h2>
                <p>Age: {age}, Grade: {grade}</p>
                <p>Email: {email}, GPA: {gpa}</p>
                <p>Address: {street}, {city}, {state} {zipCode}</p>
            </div>}
        </>
    )
}


//ila Kant 3ndna Data deja moujouda, n9dou ndirou .mao() function dirict hna w n affichiw ghir l compnent f l App.jsx
// ila la kant data t9 tbdel 3La 7ssab koula component mn l2afdal f l App.jsx ndirou .map() function w koula element fih data nèdedouha liih b lprops.