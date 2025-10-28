export default function SocialButtons() {
    return (
      <div className="flex flex-col gap-3 my-4">
        <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition">
          <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
          Continue with GitHub
        </button>
      </div>
    );
  }
  