import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { IAlbumInfo } from "../types/AlbumInfo";
import AlbumInfoForm from "../components/AlbumInfoForm";
import Image from "next/image";
import { ClipLoader, GridLoader } from "react-spinners";
import image from "./api/image";
import Gallery from "../components/Gallery";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  //parallax background effect
  useEffect(() => {
    let element = document.getElementById("parallax");
    let offset = 0;

    function update() {
      offset = window.pageYOffset;
      if (element) element.style.backgroundPositionY = offset * -0.3 + "px";
      requestAnimationFrame(update);
    }

    update();
  }, []);

  async function getImage(prompt: string) {
    setLoading(true);
    const data = { prompt };

    try {
      const response = await axios.post("/api/image", data);
      setImageUrl(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Artwork generation request denied!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleSubmit = (albumInfo: IAlbumInfo) => {
    const prompt = generateDallEPrompt(albumInfo);
    getImage(prompt);
  };

  return (
    <div className="flex justify-center flex-col w-full h-full">
      <ToastContainer />
      <div
        id="header"
        className="text-xl w-full h-20 flex items-center justify-between bg-black text-white p-4 gap-8"
      >
        <h1 className="text-2xl">ALBUM ARTWORK GENERATOR</h1>
        <div className="flex gap-8"></div>
      </div>
      <div
        id="parallax"
        className="flex flex-wrap items-center justify-center py-4"
      >
        <div className="h-full p-4 w-96 bg-white m-4 shadow-lg">
          <AlbumInfoForm onSubmit={handleSubmit} />
        </div>
        <div id="generate" className="bg-white p-2">
          {loading ? (
            <div className="w-[300px] h-[300px] bg-slate-100 flex items-center justify-center">
              <GridLoader color="#36d7b7" />
            </div>
          ) : imageUrl ? (
            <img src={imageUrl} alt="album artwork" width={500} />
          ) : (
            <div className="w-[300px] h-[300px] bg-slate-100 flex items-center justify-center">
              Generate an album cover
            </div>
          )}
        </div>
      </div>
      <div
        id="about"
        className="w-full bg-white flex items-center flex-col justify-center p-8 gap-8 px-4 lg:px-40"
      >
        <p>
          Uses{" "}
          <a className="underline" href="https://beta.openai.com/">
            openAI DALL-E
          </a>{" "}
          to generate album artwork
        </p>
        <p>
          All images generated using DALL-E are the property of the user who
          requested them. You are free to use these images for any purpose,
          including commercial use, without the need for attribution or
          permission
        </p>
        <p>
          Requests for artwork containing llegal, violent, or inappropriate
          content or requests containing bad language will be denied due to
          openAIs strict{" "}
          <a
            className="underline"
            href="https://beta.openai.com/docs/usage-policies/content-policy"
          >
            content policy
          </a>
        </p>
      </div>
      <div
        id="footer"
        className="w-full flex p-4 justify-center h-20 bg-black text-white"
      >
        <a href="https://www.tomwhitticase.com" className="underline">
          Made by Tom Whitticase
        </a>
      </div>
    </div>
  );
}

function generateDallEPrompt(albumInfo: IAlbumInfo): string {
  const { title, genre, theme, mood, colorScheme, requests, artStyle } =
    albumInfo;
  return `"Generate album artwork for a ${genre} album called "${title}" with the theme of ${title}
    , a ${mood} mood, a color scheme of ${colorScheme}, and an art style of ${artStyle}. ${requests}"`;
}
