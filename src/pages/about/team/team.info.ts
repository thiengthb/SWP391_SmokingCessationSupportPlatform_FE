export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  description: string;
}

export const teamMembers :TeamMember[] = [
  {
    name: "Tran Ngoc Thien",
    role: "Project Leader",
    image: "/team/member1.jpg",
    description: "Leading the development team with a focus on innovation and user experience, ensuring the project meets its goals",
  },
  {
    name: "Vu Anh Tuan",
    role: "Backend Developer",
    image: "/team/member2.jpg",
    description: "Expert in Springboot and MySQL, focusing on scalable backend solutions for health tech",
  },
  {
    name: "Tran Nhat Chinh",
    role: "Backend Developer",
    image: "/team/member3.jpg",
    description: "Backend developer with expertise in Springboot and database management, ensuring robust application performance",
  },
  {
    name: "Hoang Tung Lam",
    role: "Frontend Developer",
    image: "/team/member4.jpg",
    description: "Frontend developer specializing in React and responsive design, making applications user-friendly",
  }
];