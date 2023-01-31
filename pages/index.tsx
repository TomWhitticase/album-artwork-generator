import { useEffect, useState } from "react";
import axios from "axios";
import { IAlbumInfo } from "../types/AlbumInfo";
import AlbumInfoForm from "../components/AlbumInfoForm";
import { GridLoader } from "react-spinners";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const saveImage = (url: string) => {
    const link = document.createElement("a");
    link.download = "album-artwork.jpg";
    link.href = url;
    link.target = "_blank";
    link.click();
  };

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
      setImageUrls(response.data);
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
        className="flex flex-col lg:flex-row items-center justify-center"
      >
        {/* <div className="w-[300px] h-[300px] bg-slate-100 flex items-center justify-center">
              <GridLoader color="#36d7b7" />
            </div> */}
        <div className="h-full w-full max-w-[400px] bg-white m-4 p-4 shadow-lg">
          <AlbumInfoForm onSubmit={handleSubmit} loading={loading} />
        </div>
        <div
          id="generate"
          className="p-2 flex flex-wrap items-center justify-center gap-8 w-full max-w-[800px]"
        >
          {!loading
            ? imageUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  onClick={() => saveImage(url)}
                  alt="album artwork"
                  width={300}
                  className="border-8 border-white cursor-pointer"
                />
              ))
            : [0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-[300px] h-[300px] bg-slate-100 flex items-center justify-center"
                >
                  <GridLoader color="#36d7b7" />
                </div>
              ))}
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
  return `"Generate album artwork for a ${genre} album called "${title}" with the theme of ${theme}, a ${mood} mood, a color scheme of ${colorScheme}, and an art style of ${artStyle}. ${requests}"`;
}
