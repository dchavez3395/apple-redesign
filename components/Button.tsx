
interface Props {
    title: string;
    onClick?: () => void;
    width?: string;
    loading?: boolean;
    padding?: string;
    noIcon?: boolean;
  }

function Button({ title, onClick, width, loading, padding, noIcon }: Props){
  return (
    <button className={`relative z-30 ease group inline-flex box-border ${width ? width : 'w-auto'} ${padding} cursor-pointer overflow-hiden rounded justify-center items-center font-bold py-3 px-8 text-white transition-all duration-300 focus:outline-none bg-indigo-600 bg-gradient-to-r from-pink-500 to-violet-500`} onClick={onClick}>
        <span className="absolute bottom-0 right-0 -mb-0 -mr-5 h-20 w-8 bg-white translate-x-1 rotate-45 transform opacity-10 ease-out duration-300 group-hover:translate-x-0"></span>
        <span className="absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0"></span>
      <span className="absolute top-0 left-0 -mt-1 -ml-12 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0"></span>

      <span className="relative z-20 flex items-center font-semibold">
        {noIcon && (
          <svg
            className="relative mr-2 h-5 w-5 flex-shrink-0 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        )}
        {loading ? "Loading..." : title}
      </span>
    </button>
  )
}

export default Button