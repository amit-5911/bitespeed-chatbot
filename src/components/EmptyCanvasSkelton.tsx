export default function EmptyCanvasSkelton() {
  return (
    <div className="w-[70%] max-w-[50rem] h-fit p-5  absolute inset-0 flex items-center justify-center m-auto border-gray-400 bg-gray-200 shadow-uniform border-2 border-dashed rounded-xl opacity-70">
      <div className="md:text-3xl space-y-4 text-center md:leading-10 ">
        <p>Fresh canvas!</p>
        <p className="  ">
          Drag nodes from right panel and drop on the canvas to create the
          desired flow, we will take care of the rest!
        </p>
      </div>
    </div>
  );
}
