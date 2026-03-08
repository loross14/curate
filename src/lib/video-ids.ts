// Moon or Bust — YouTube Video ID Registry
// Discovered via yt-dlp search 2026-03-08
// Playlist PL4k0fH8EgI3Yt7nM8KQhBjz-XtKwhaM8h is DEAD — these are individually confirmed

export const MOB_VIDEO_IDS: Record<string, { id: string; title: string; epNum?: number }> = {
  // S-TIER GUESTS
  "ep92-brett-johnson": { id: "A2iZWeH_ojo", title: "How Former FBI's Most Wanted Hacker Cashed Out In Crypto", epNum: 92 },
  "ep20-billy-markus": { id: "ehNgfJziVcg", title: "Dogecoin Co-Creator Billy Markus Interview", epNum: 20 },
  "ep20-billy-markus-replay": { id: "j8k0VbCJNEA", title: "BZreplay: Dogecoin Co-Creator Billy Markus Interview", epNum: 20 },

  // A-TIER GUESTS
  "ep56-mike-demarais": { id: "VD5RDcFM7xM", title: "Breaking Into Crypto Feat. Mike Demarais | Rainbow Wallet, Unisocks, and DeFi UX", epNum: 56 },
  "ep69-brantly-eth": { id: "gUhKgGUvyJE", title: "Brantly.eth On Digital Identity | Director of The Ethereum Name Service ($ENS)", epNum: 69 },
  "ep80-austin-virts": { id: "l9JxDu72ZSo", title: "This Music Cryptocurrency is Integrated With TikTok | Audius (AUDIO) Interview", epNum: 80 },
  "ep70-arthur-brock": { id: "CBDsguc5k0c", title: "Market Analysis With HyperLinq CEO | Co-Founder of Holochain Arthur Brock", epNum: 70 },
  "ep53-ava-labs": { id: "UEjs16sHQqc", title: "We Tried Buying The Constitution… | Ava Labs (AVAX) President Interview", epNum: 53 },
  "ep18-tim-draper": { id: "2G_MBcDqLZ0", title: "Tim Draper Talks DeFi | Moon Or Bust", epNum: 18 },
  "ep18-tim-draper-replay": { id: "INji7wm_t3I", title: "BZreplay: Tim Draper Talks DeFi on Moon Or Bust", epNum: 18 },
  "ep38-bitboy": { id: undefined as unknown as string, title: "Bitboy Crypto", epNum: 38 }, // NOT FOUND YET

  // B-TIER (NO GUEST / SOLO EPISODES)
  "ep81-top-100": { id: "Pl_ysv0EjJI", title: "Top 100 Cryptocurrencies In 60 Minutes Challenge!", epNum: 81 },
  "ep62-2022-strategies": { id: "46ySPg7qjDE", title: "2022 Crypto Strategies Special: Moonshots, DeFi, NFTs and Airdrops", epNum: 62 },
  "ep47-floki-ta": { id: "2b1G8GJgZlU", title: "Bitcoin ETF Approved! | Floki Inu Technical Analysis", epNum: 47 },
  "ep23-regulation": { id: "OMsNb-O2dmk", title: "Crypto Regulation Incoming | Exploring Decentraland", epNum: 23 },
  "ep72-ethdenver": { id: "0i3727vSVJw", title: "ETHDenver Recap: Vitalik Buterin, Andrew Yang, and Kimbal Musk", epNum: 72 },
  "ep72-ethdenver-interviews": { id: "4pCoabZaqp4", title: "Experience ETHDENVER 2022 7 Epic Interviews!", epNum: 72 },
  "ep85-btc-miami": { id: undefined as unknown as string, title: "Bitcoin Miami Recap | Moonbirds are Flying | Moon or Bust BTC SPECIAL", epNum: 85 }, // NOT FOUND YET

  // OTHER CONFIRMED
  "ep10-zach-boychuk": { id: "uQyRL2JDpDQ", title: "Crypto Comeback? | Zach Boychuk Interview", epNum: 10 },
  "ep11-doge-days": { id: "6GFXtdmgL2o", title: "Doge Days | Million Doge Disco & CocoChanel Adair Interview", epNum: 11 },
  "ep12-shiba-inu": { id: "VOAUvY8lXws", title: "Shiba Inu Interview | Robinhood vs. Coinbase", epNum: 12 },
  "ep14-alena": { id: "DauYKCsX3OE", title: "AlenaXBT Interview | More Downside Incoming?", epNum: 14 },
  "ep16-cosmos": { id: "oN3ZU2oGJVA", title: "Cosmos Blockchain Interview | The Internet of Blockchains", epNum: 16 },
  "ep19-bword": { id: "0OIJiVYJOgk", title: "The B Word LIVE REACTION", epNum: 19 },
  "ep21-amazon-btc": { id: "KacMysEmomU", title: "Amazon Accepting BTC?? | Cryptocurrency Tier List", epNum: 21 },
  "ep25-polynetwork": { id: "q25eGWLXE4E", title: "PolyNetwork Hack | Axie Infinity Co-Founder Interview", epNum: 25 },
  "ep26-everrise": { id: "-8ePJxE68q0", title: "IS LOGAN A PENGU MILLIONAIRE?!?! | EverRise Interview", epNum: 26 },
  "ep27-backd": { id: "tArWvvtgHQQ", title: "EIP-1559 Burn Update | Backd Interview", epNum: 27 },
  "ep28-blockchain": { id: "OmzwdEIOYM4", title: "Cosmos Starport Interview | How to Build Your Own Blockchain", epNum: 28 },
  "ep29-solana": { id: "PhbvS0Wo8zI", title: "Getting Started With Solana", epNum: 29 },
  "ep31-macro": { id: "TBeXkjSlvmI", title: "Crypto Macro Trends | Proof of Stake Bitcoin??", epNum: 31 },
  "ep32-solana-shutdown": { id: "4opQRV-tsiQ", title: "Solana Shutdown! | Phantom Wallet Interview", epNum: 32 },
  "ep34-strategies": { id: "9C5KXCEbzLE", title: "Our Crypto Strategies for the Rest of 2021", epNum: 34 },
  "ep35-taxation": { id: "rsgygFPggFg", title: "Bitcoin Holding the Line | Taxfyle CEO on Crypto Taxation", epNum: 35 },
  "ep39-tokens-com": { id: "-vh0F-063Co", title: "Cardano Smart Contracts Live!! | Tokens.com CEO Interview", epNum: 39 },
  "ep40-nfts-daos": { id: "LxBzu-8uXsE", title: "NFTs, DAOs and More With David Sun | Proof of Beauty London", epNum: 40 },
  "ep43-stacks": { id: "F74UOWtd7ns", title: "Floki Inu Giveaway | VideoCoin Interview Feat. Halsey", epNum: 43 },
  "ep44-david-sun": { id: undefined as unknown as string, title: "Proof of Beauty Publico ft. David Sun", epNum: 44 }, // NOT FOUND YET
  "ep45-wutang": { id: "zGYP5GSbAX8", title: "EXCLUSIVE: Here's The Broker of $4 Million PleasrDAO Wu-Tang NFT Purchase", epNum: 45 },
  "ep48-dog-mania": { id: "JmTKBmrdfAo", title: "Dog Coin Mania: DOGE, SHIB, FLOKI, Saitama | Pastel Interview", epNum: 48 },
  "ep54-eth-avax": { id: "8LPNq69zOJQ", title: "ETH vs. AVAX | Conversation With CryptoPunk #5273", epNum: 54 },
  "ep57-brave": { id: "kEMDd8nY4XE", title: "Crypto Markets Down Bad | Interview With Brave Browser Co-Founder", epNum: 57 },
  "ep59-metaverse": { id: "yyg-ECG87UA", title: "Metaverse Real Estate feat. Michael Gord | Sandbox vs. Decentraland??", epNum: 59 },
  "ep63-unstoppable": { id: "OG78Bg1EQEM", title: "How to Profit While ETH Crashes | Unstoppable Domains CEO Interview", epNum: 63 },
  "ep64-blockchain-games": { id: "INjD-A2ruso", title: "Making Money From Blockchain Games | How To Get NFTs Early", epNum: 64 },
  "ep71-super-bowl": { id: "vIhoiDL33pU", title: "Crypto at The Super Bowl | David Bianchi Interview on NFTs", epNum: 71 },
  "ep73-nft-reveal": { id: "GFZtalekCBc", title: "Is This The Worst NFT Reveal Ever?! | Parallel Finance Founder Interview", epNum: 73 },
  "ep74-garyvee": { id: "yMafDq3cGt0", title: "These Guys Interviewed Who?! | GaryVee, Andrew Yang", epNum: 74 },
  "ep75-microsoft": { id: "zdWVRlkUdo0", title: "Former Microsoft Employee Apes In To Web3 | Adam Hollander Interview", epNum: 75 },
  "ep76-biden": { id: "cNcO4Jd6klA", title: "What Biden's Executive Order Means for Crypto | David Gohkstein Interview", epNum: 76 },
  "ep5-ultrasafe": { id: "9M_Du1K65Co", title: "UltraSafe Interview | SHIBA on Coinbase", epNum: 5 },
  "ep8-pob": { id: "96G2HUTa96w", title: "Where is Blockchain Headed? | POB.Studio Interview", epNum: 8 },
  "ep41-shiba-floki": { id: "LWZ2RjZz0Io", title: "Shiba Inu vs. Floki Inu? | Shiba Inu Special!", epNum: 41 },
  "ep55-pob-nft": { id: "O8IBKZ9JuH4", title: "New Twitter CEO Great For ETH | Proof of Beauty's Next NFT Launch", epNum: 55 },
};

// Total confirmed: ~50 of 102 episodes
// Missing: ~52 episodes not surfaced by yt-dlp search (may need direct channel scrape or manual lookup)
