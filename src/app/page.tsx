"use client";
import Hero from "@/components/Hero";
import axios from "axios";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { RiLoader3Line } from "react-icons/ri";
import { FaRegCopy, FaCopy, FaUndoAlt, FaTrash } from "react-icons/fa";
import Header from "@/components/Header";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [previousInputText, setPreviousInputText] = useState("");
  const [userText, setUserText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const [textResult, setTextResult] = useState("");
  const [showUser, setShowUser] = useState(false);

  const [loading, setLoading] = useState(false);

  async function animateText(response: any) {
    const formattedText = response
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold
      .replace(/\*\s(.*?)\n/g, "<li>$1</li>") // List
      .replace(/\n/g, "<br/>"); // New Line

    const text: any = formattedText.split(" ");
    let perText = "";

    for (let index = 0; index < text.length; index++) {
      setTimeout(() => {
        perText += text[index] + " ";
        setTextResult(perText);

        if (index === text.length - 1) {
          setLoading(false);
        }
      }, 20 * index);
    }
  }

  async function generateAnswer(prompt: string) {
    setTextResult("");
    setInputText("");
    if (!loading) {
      setIsCopied(false);
      setLoading(true);
      setShowUser(true);

      setUserText(prompt);
      setPreviousInputText(prompt);

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`,
        method: "post",
        data: { contents: [{ parts: [{ text: prompt }] }] },
      });

      animateText(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
      console.log(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
    }
  }

  async function restartGenerate() {
    generateAnswer(previousInputText);
  }

  function removeResult() {
    setIsCopied(false);
    setLoading(false);
    setInputText("");
    setTextResult("");
    setShowUser(false);
  }

  function copyResult() {
    setIsCopied(true);
    const plainText = textResult.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "");
    navigator.clipboard.writeText(plainText).then(() => {});
  }

  return (
    <div className="w-screen h-svh px-2 flex flex-col items-center justify-center">
      {/* Section Hero */}
      {!showUser && (
        <>
          <Hero />
          <Header />
        </>
      )}

      {/* Section 1 */}
      <div
        className={`sm:w-full lg:w-[55%] h-full ${
          textResult ? "overflow-y-scroll" : ""
        } sm:p-6 md:p-8 sm:text-sm md:text-base`}
      >
        {showUser && (
          <div>
            <p>{userText}</p>
            <div className="divider sm:mb-6 md:mb-8" />
          </div>
        )}

        {!textResult && showUser && (
          <div>
            <div className="skeleton h-4 w-full mb-2"></div>
            <div className="skeleton h-4 w-full mb-2"></div>
            <div className="skeleton h-4 w-full mb-2"></div>
          </div>
        )}

        <div className="w-full rounded-sm">
          <p dangerouslySetInnerHTML={{ __html: textResult }}></p>
        </div>

        {!loading && textResult && (
          <div className="flex flex-row sm:mt-6 md:mt-8 sm:text-sm lg:text-xs">
            <div
              className="cursor-pointer hover:bg-gray-100 duration-200 rounded-lg p-3"
              onClick={() => copyResult()}
            >
              {isCopied ? <FaCopy /> : <FaRegCopy />}
            </div>
            <div
              className="cursor-pointer hover:bg-gray-100 duration-200 rounded-lg p-3  mx-1"
              onClick={() => restartGenerate()}
            >
              <FaUndoAlt />
            </div>
            <div
              className="cursor-pointer hover:bg-gray-100 duration-200 rounded-lg p-3"
              onClick={() => removeResult()}
            >
              <FaTrash />
            </div>
          </div>
        )}
      </div>

      {/* Section 2 */}
      <div className="sm:w-full lg:w-[55%] sm:mb-6 lg:mb-4 pt-2 flex flex-row">
        <input
          className="px-4 py-3 outline-none w-full rounded-sm border-[1.5px] border-solid border-black"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generateAnswer(inputText)}
          type="text"
          placeholder="Ketik di sini..."
        />
        <button
          className="btn btn-neutral h-full w-auto"
          onClick={() => generateAnswer(inputText)}
          disabled={loading ? true : false}
        >
          {loading ? <RiLoader3Line className="animate-spin" /> : <IoSend />}
        </button>
      </div>
    </div>
  );
}
