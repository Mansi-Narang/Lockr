import { Eye, Clipboard, Edit, Trash2 } from 'lucide-react';

const VaultCard = ({ name, username, url, password, lastUpdated }) => {
  return (
    <div className="bg-gradient-to-br from-[#1E2A47] to-[#1A2747] text-white p-6 rounded-xl w-full max-w-xl mx-auto shadow-lg border border-[#2A3555]">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-300">{username}</p>
          <a href={url} target="_blank" className="text-sm text-blue-400">{url}</a>
        </div>
        <div className="text-sm text-gray-400">
          <span className="text-blue-300 font-medium">Good</span> {lastUpdated}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 bg-[#2F3B5A] px-4 py-3 rounded-lg">
        <label className="text-sm w-20 text-gray-300">Password:</label>
        <input
          type="password"
          value={password}
          readOnly
          className="bg-transparent flex-1 text-white outline-none"
        />
        <Eye size={18} className="cursor-pointer text-gray-300 hover:text-white" />
        <Clipboard size={18} className="cursor-pointer text-gray-300 hover:text-white" />
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <button className="flex items-center gap-1 text-blue-300 hover:underline text-sm">
          <Edit size={14} />
          Edit
        </button>
        <button className="flex items-center gap-1 text-red-400 hover:underline text-sm">
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default VaultCard;
