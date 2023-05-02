import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { getAllNews } from "../../services/userService";
import { HomeBody } from "./HomeStyled";

export default function Home() {
  const [news, setNews] = useState([]);

  async function findNews() {
    const response = await getAllNews();
    setNews(response.data.results);
  }

  useEffect(() => {
    findNews();
  }, []);

  return (
    <>
      <Navbar />
      <HomeBody>
        {news.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            text={item.text}
            banner={item.banner}
            likes={item.likes.length}
            comments={item.comments.length}
          />
        ))}
      </HomeBody>
    </>
  );
}
