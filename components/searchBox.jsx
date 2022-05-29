import React, { useState } from 'react'

const styles = {
  input:
    'w-full rounded-lg border-2 border-gray-400 bg-transparent px-4 py-3 text-white placeholder-gray-400',
  searchContainer:
    'flex flex-col items-center justify-center gap-y-3 py-8 w-2/5 mx-auto px-5 bg-[#323546] mt-20 rounded-3xl',
  searchBtn:
    'rounded-xl border-2 border-gray-200 px-4 py-2 text-gray-200 active:border-gray-500 active:bg-gray-300 active:text-gray-500',
}

const searchBox = ({
  walletHandler,
  wallet,
  collection,
  collectionHandler,
  btnClickHandler,
  checkBoxHanlder,
}) => {
  return (
    <div>
      <div className={styles.searchContainer}>
        <h2 className="mb-3 text-3xl text-white">NFT Gallery</h2>
        <input
          className={styles.input}
          onChange={(e) => {
            walletHandler(e.target.value)
          }}
          value={wallet}
          type="text"
          placeholder="Add your wallet address"
        />
        <input
          className={styles.input}
          onChange={(e) => {
            collectionHandler(e.target.value)
          }}
          value={collection}
          type="text"
          placeholder="Add the collection address"
        />

        <label className="my-2 cursor-pointer text-gray-200 active:text-gray-500">
          <input
            onChange={(e) => {
              checkBoxHanlder(e.target.checked)
            }}
            type="checkbox"
          />
          &nbsp; Fetch for Collection
        </label>

        <button
          className={styles.searchBtn}
          onClick={() => {
            btnClickHandler()
          }}
        >
          Search NFTs
        </button>
      </div>
    </div>
  )
}

export default searchBox