import { useState } from 'react';
import axios from 'axios';

interface NFT {
  id: string;
  name: string;
  description?: string;
  image_url: string;
  opensea_url: string;
  total_supply?: number;
}

interface Collection {
  name: string;
  image_url: string;
  description: string;
  permalink: string;
}

const OpenSeaSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchCollections = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    setNfts([]);

    try {
        const options = {
            method: 'GET',
            url: `https://api.opensea.io/api/v2/collection/${searchTerm}/nfts`,
            headers: {accept: 'application/json', 'x-api-key': '00382bae876a44f28ff008898c96b4fe'}
        };
        
        const response = await axios.request(options);
        if (response.data && Array.isArray(response.data.nfts)) {
            setNfts(response.data.nfts);
        } else {
            setError('No NFTs found in this collection');
            setNfts([]);
        }
    } catch (err) {
        setError('Failed to fetch collection. Please try again.');
        console.error('Error fetching collection:', err);
        setNfts([]);
    } finally {
        setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchCollections();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search NFT collections..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {nfts && nfts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nfts.map((nft) => (
            <div key={nft.id} className="border border-gray-200 rounded-lg p-4">
              {nft.image_url && (
                <img
                  src={nft.image_url}
                  alt={nft.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{nft.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {nft.description?.slice(0, 150)}
                {(nft.description?.length ?? 0) > 150 ? '...' : ''}
              </p>
              <p className="text-sm text-gray-500">Total Supply: {nft.total_supply}</p>
              <a 
                href={nft.opensea_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                View on OpenSea
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OpenSeaSearch;
