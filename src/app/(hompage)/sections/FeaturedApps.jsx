"use client";

import React from "react";

const FeaturedApps = () => {
  const [userInput, setUserInput] = React.useState("stock analysis");
  const [tools, setTools] = React.useState([
    {
      id: 23051,
      name: "Punchline Painter",
      slug: "punchline-painter",
      url: "https://chat.openai.com/g/g-MVqqkmMIl-p-u-n-c-h-l-i-n-e-p-a-i-n-t-e-r",
      icon_src:
        "https://media.theresanaiforthat.com/icons/punchline-painter.png",
      has_icon: "2",
    },
    {
      id: 43790,
      name: "TranslateI18N - A Visual Studio Extension for i18n gpt translator",
      slug: "translatei18n-a-visual-studio-extension-for-i18n-gpt-translator",
      url: "https://www.translatei18n.com/",
      icon_src:
        "https://media.theresanaiforthat.com/icons/translatei18n-a-visual-studio-extension-for-i18n-gpt-translator.svg",
      has_icon: "1",
    },
    {
      id: 23690,
      name: "R.E.S.O.N.A.T.E. Framework for Viral Content",
      slug: "r-e-s-o-n-a-t-e-framework-for-viral-content",
      url: "https://chat.openai.com/g/g-NqdyH4ZE8-r-e-s-o-n-a-t-e-framework-for-viral-content",
      icon_src:
        "https://media.theresanaiforthat.com/icons/r-e-s-o-n-a-t-e-framework-for-viral-content.png",
      has_icon: "2",
    },
    {
      id: 1121,
      name: "The Best Way to Start a Conversation",
      slug: "opener",
      url: "https://opener.chat/",
      icon_src: "https://media.theresanaiforthat.com/icons/opener.svg",
      has_icon: "1",
    },
  ]);

  const fetchAiTools = (config) => {
    fetch(`/api/search?query=${userInput}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTools(data.data);
      });
  };

  return (
    <div>
      <div class="h-screen flex flex-col pb-6">
        <div class="h-full flex flex-col justify-center">
          <div class="container grid grid-cols-4 gap-2 mt-12">
            {tools.map((tool) => (
              <a href={tool.url} target="_blank" rel="noreferrer">
                <div class="bg-white rounded-lg border p-4 flex flex-col justify-center items-center hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                  <img
                    src={tool.icon_src}
                    alt={tool.name}
                    class="w-20 h-20 rounded-full"
                  />
                  <h3 class="mt-4 text-xl font-semibold">{tool.name}</h3>
                  <p class="mt-4 text-gray-600 dark:text-neutral-400">
                    {tool.slug}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedApps;
