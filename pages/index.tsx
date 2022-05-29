import { useState,useReducer } from 'react'
import { NFTCard } from '../components/nftCard'
const Home = () => {
  const [wallet, setWalletAddress] = useState('')
  const [collection, setCollectionAddress] = useState('')
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)
  
  const fetchNFTs = async () => {
    let nfts
    console.log('fetching nfts')
    const api_key = process.env.API_KEY
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`
    var requestOptions = {
      method: 'GET',
    }

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else {
      console.log('fetching nfts for collection owned by address')
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (nfts) {
      console.log('nfts:', nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET',
      }
      const api_key = process.env.API_KEY
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${'true'}`
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      )
      if (nfts) {
        console.log('NFTs in collection:', nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 py-8">
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <input
          disabled={fetchForCollection}
          onChange={(e) => setWalletAddress(e.target.value)}
          type={'text'}
          placeholder="Add your wallet address"
        ></input>
        <input
          onChange={(e) => setCollectionAddress(e.target.value)}
          type={'text'}
          placeholder="Add the collection address"
        ></input>
        <label className="text-gray-600 ">
          <input
            onChange={(e) => {
              setFetchForCollection(e.target.checked)
            }}
            type={'checkbox'}
            className="mr-2"
          ></input>
          Fetch for collection
        </label>
        <button
          className={
            'mt-3 w-1/5 rounded-sm bg-blue-400 px-4 py-2 text-white disabled:bg-slate-500'
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else fetchNFTs()
          }}
        >
          View NFT's{' '}
        </button>
      </div>
      <div className="mt-4 flex w-5/6 flex-wrap justify-center gap-y-12 gap-x-2">
        {NFTs.length &&
          NFTs.map((nft, index) => {
            return <NFTCard key={index} nft={nft}></NFTCard>
          })}
      </div>
      
    </div>
  )
}

export default Home
