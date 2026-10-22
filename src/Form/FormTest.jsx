// utils/seedUsers.js
export const seedUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

  if (existingUsers.length === 0) {
    const defaultUsers = [
      {
        id: "1",
        name: "Daud Ansari",
        email: "daudansari6472@gmail.com",
        password: "password123",
        avatar:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
        role: "Senior Developer",
        posts: 142,
        followers: 1200,
        following: 890,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        avatar:
          "https://images.unsplash.com/photo-1494790108378-be9c7b6e3e8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW58ZW58MHx8MHx8fA%3D%3D",
        role: "UI/UX Designer",
        posts: 89,
        followers: 850,
        following: 432,
        createdAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }
};

// Call this in your App.js or main component
// seedUsers();
