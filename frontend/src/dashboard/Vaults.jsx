import React, { useState, useEffect } from 'react';
import { Search, Plus, Shield, Filter, Grid, List } from 'lucide-react';
import VaultCard from './VaultCard.jsx';
import AddVaultModal from './AddVaultModal.jsx';
import {getVaultsApi, deleteVaultsApi, addVaultApi} from '../../API/VaultsApi.js';


const Vaults = () => {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchVaults = async () => {
      try {
        setLoading(true);
        const data = await getVaultsApi();
        setVaults(data);
      } catch (error) {
        console.error('Failed to fetch vaults:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaults();
  }, []);

  const handleEdit = (vault) => {
    console.log('Edit vault:', vault);
    
  };

  const handleDelete = async (vaultId) => {
    console.log('Delete vault:', vaultId);
    const vaults = await deleteVaultsApi(vaultId);
    setVaults(prev => prev.filter(v => v._id !== vaultId));
  };

  const handleView = (vault) => {
    console.log('View vault:', vault);
  };

  const handleAddVault = async (vaultData) => {
    console.log('Add vault:', vaultData);
    const newVault = await addVaultApi(vaultData);

    setVaults(prev => [newVault, ...prev]);
  };

  const filteredVaults = vaults && vaults.length && vaults
    .filter(vault => {
      const searchLower = searchTerm.toLowerCase();
      return (
        vault.domainName.toLowerCase().includes(searchLower) ||
        vault.domainUsername.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.domainName.localeCompare(b.domainName);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your vaults...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search vaults..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="created">Sort by Created</option>
              <option value="updated">Sort by Updated</option>
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'} transition-all duration-200`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'} transition-all duration-200`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {!vaults?.length ? (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No vaults found' : 'No vaults yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Start securing your passwords by creating your first vault'
              }
            </p>
            {/* {!searchTerm && (
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Vault</span>
              </button>
            )} */}
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredVaults?.map((vault) => (
              <VaultCard
                key={vault._id}
                vault={vault}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </div>

      <AddVaultModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddVault}
      />
    </div>
  );
};

export default Vaults;
