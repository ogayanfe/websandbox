import { Breadcrumbs } from "@mui/material";
import { getApiClient } from "../../utils/authutils";
import { useLoaderData } from "react-router-dom";
import { SandboxInfoType } from "../../types/utils/sandboxUtils";
import { capitalizeText } from "../../utils/sandboxUtils";
import { CodeTwoTone } from "@mui/icons-material";
import { useEffect } from "react";

export async function demoRouteLoader() {
  const url = "sandbox/demos";
  const apiClient = getApiClient();
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    return [];
  }
}

interface ImageComponentType {
  src: undefined | null | string;
  alt: string;
  link: string;
  linkText: string;
}

function ImageComponent({ src, alt, link, linkText }: ImageComponentType) {
  if (src) {
    return (
      <a href={link}>
        <span className="fixed -left-[20000000000000000px]">{linkText}</span>
        <img
          src={src}
          alt={alt}
          crossOrigin="anonymous"
          className="rounded-t-xl h-60 w-full object-fill hover:scale-[1.1] transition-all duration-1000"
        />
      </a>
    );
  }
  return (
    <a href={link}>
      <span className="fixed -left-[20000000000000000px]">{linkText}</span>
      <div className="rounded-t-xl h-60 bg-white dark:bg-[#1d1d1d] flex items-center justify-center">
        {<CodeTwoTone sx={{ fontSize: "200px" }} />}
      </div>
    </a>
  );
}

interface demoItemType {
  info: SandboxInfoType;
}
function DemoItem({ info }: demoItemType) {
  return (
    <div className="w-full h-[19rem] rounded-xl shadow-md dark:bg-[#141414] flex flex-col border-gray-100 dark:border-none border overflow-hidden relative">
      <ImageComponent
        src={info.preview}
        alt={`${info.owner.username} / ${info.title} image preview`}
        linkText={`open ${info.title} in editor`}
        link={`/${info.owner.username}/${info.title}`}
      />
      <div className="flex w-full items-center justify-center flex-grow dark:bg-[#151515] bg-gray-200 rounded-b-xl">
        <Breadcrumbs>
          <p className="text-gray-500 dark:text-gray-300 text-md font-semibold">
            @{info.owner.username}
          </p>
          <p className="dark:text-white text-md text-gray-900 font-semibold">
            {capitalizeText(info.title)}
          </p>
        </Breadcrumbs>
      </div>
    </div>
  );
}

export default function Demos() {
  const data = useLoaderData() as SandboxInfoType[];
  useEffect(() => {
    document.title = "WebSandbox | Demos";
  }, []);
  return (
    <div className="flex-col items-center w-full justify-center h-full pb-10">
      <h2 className="text-lg xl:text-2xl font-semibold text-gray-800 text-center dark:text-blue-100 p-4">
        Project Demos
      </h2>
      {data && data.length > 0 ? (
        <div className="grid w-full grid-cols-1 px-8 mxm:px-8 lg:grid-cols-3 mxm:grid-cols-2 mx-auto gap-8 py-8 pb-20 max-w-7xl">
          {data.map((i) => (
            <DemoItem info={i} key={i.id} />
          ))}
        </div>
      ) : (
        <div className="text-center flex items-center justify-center h-[60%] px-4 flex-grow text-2xl uppercase text-gray-900 font-semibold dark:text-white">
          There are no demos available currently
        </div>
      )}
    </div>
  );
}
