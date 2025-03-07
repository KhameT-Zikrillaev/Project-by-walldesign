export default function ImageModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed bg-gray-900/70 inset-0  flex items-center justify-center"
      onClick={onClose} // Modal tashqarisini bossak yopiladi
    >
      <div
        className="relative p-2 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Modal ichini bosganda yopilmasligi uchun
      >
        {/* Close button */}
        <button
          className="absolute top-4 cursor-pointer right-4 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          <span className="text-white cursor-pointer">✕</span>
        </button>

        {/* Modal Image */}
        <img
          src={imageUrl}
          alt="Modal"
          className="max-w-lg max-h-[80vh] rounded"
        />
      </div>
    </div>
  );
}
