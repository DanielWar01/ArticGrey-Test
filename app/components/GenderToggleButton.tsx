import {useState} from 'react';

const GenderToggleButton = () => {
  const [isMen, setIsMen] = useState(true);

  const handleToggle = () => {
    setIsMen((prev) => !prev);
  };

  return (
    <button
      className={`btn-gender relative flex h-10 items-center justify-between bg-[#E4E4E4] text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer w-32 overflow-hidden ${
        isMen ? 'gender-men' : 'gender-women'
      }`}
      onClick={handleToggle}
    >
      <label
        htmlFor="gender-toggle"
        className="absolute inset-0 flex items-center justify-between cursor-pointer"
      >
        <input
          id="gender-toggle"
          type="checkbox"
          className="check-gender hidden" // Ocultamos el input visualmente
          checked={!isMen}
          onChange={handleToggle}
        />
        <span
          className={`absolute left-4 transition-opacity duration-300 ${
            isMen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Men
        </span>
        <span
          className={`absolute right-4 transition-opacity duration-300 ${
            isMen ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Women
        </span>
      </label>
    </button>
  );
};

export default GenderToggleButton;
