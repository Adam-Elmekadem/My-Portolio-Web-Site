import portfolio from "../assets/images/portfolio.jpeg";
import ecomerce from "../assets/images/ecomerce.jpeg";
import shoppingCart from "../assets/images/shoppingCart.jpeg";
import Camping from "../assets/images/Camping.jpeg";

const projectsData = [
  {
    title: "Portfolio Website",
    image: portfolio,
    description: "A personal portfolio showcasing my projects and skills.",
    link: "https://github.com/adam/portfolio",
    tech: ["React", "CSS", "JavaScript"]
  },
  {
    title: "E-commerce App",
    image: ecomerce,
    description: "An online store for buying and selling products.",
    link: "https://github.com/adam/ecommerce",
    tech: ["React", "Node.js", "MongoDB"]
  },
  {
    title: "Shopping Cart",
    image: shoppingCart,
    description: "A shopping cart application for online stores.",
    link: "https://github.com/adam/ecommerce",
    tech: ["React", "Node.js", "MongoDB"]
  },
  {
    title: "Blog Platform",
    image: Camping,
    description: "A platform for creating and sharing blog posts.",
    link: "https://github.com/adam/blog-platform",
    tech: ["Laravel", "MySQL", "Bootstrap"]
  }
];

export default projectsData;
