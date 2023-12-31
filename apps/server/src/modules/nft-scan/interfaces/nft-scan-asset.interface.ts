interface Attributes {
  /**
   * The attribute name
   */
  attribute_name: string;
  /**
   * The value for the attribute name
   */
  attribute_value: string;
  /**
   * How many items have this attribute value
   */
  percentage: string;
}

export interface NftScanEvmAsset {
  /**
   * The amount of the NFT (Default 1 for the ERC-721 NFT)
   */
  amount: string;
  /**
   * List of attributes
   */
  attributes: Array<Attributes>;
  /**
   * The content type
   */
  content_type: string;
  /**
   * The content URI to display
   */
  content_uri: string;
  /**
   * The contract address
   */
  contract_address: string;
  /**
   * The name of the contract
   */
  contract_name: string;
  /**
   * The token ID of the NFT in Hex
   */
  contract_token_id: string;
  /**
   * The description to display
   */
  description: string;
  /**
   * The erc type of the NFT (erc721 or erc1155)
   */
  erc_type: string;
  /**
   * External link to the original website
   */
  external_link: string;
  /**
   * The image URI to display
   */
  image_uri: string;
  /**
   * The latest trade price for the item
   */
  latest_trade_price: number;
  /**
   * The latest trade symbol for the item
   */
  latest_trade_symbol: string;
  /**
   * The latest trade timestamp in milliseconds for the item
   */
  latest_trade_timestamp: number;
  /**
   * The latest trade token for the item
   */
  latest_trade_token: string;
  /**
   * The metadata in JSON format
   */
  metadata_json: string;
  /**
   * The price when the item was minted (null if the item is an ERC-1155 NFT)
   */
  mint_price: number;
  /**
   * The timestamp in milliseconds when the item was minted
   */
  mint_timestamp: number;
  /**
   * The transaction hash when the item was minted
   */
  mint_transaction_hash: string;
  /**
   * The user address who minted the item
   */
  minter: string;
  /**
   * The name
   */
  name: string;
  /**
   * The unique ID generated for the item by NFTScan
   */
  nftscan_id: string;
  /**
   * The image URI stored by NFTScan (null if not stored by NFTScan)
   */
  nftscan_uri: string;
  /**
   * The timestamp in milliseconds when the item was owned (null if the item is an ERC-1155 NFT)
   */
  own_timestamp: number;
  /**
   * The user address who owns the item now (null if the item is an ERC-1155 NFT)
   */
  owner: string;
  /**
   * The rarity rank for the item
   */
  rarity_rank: number;
  /**
   * The rarity score for the item
   */
  rarity_score: number;
  /**
   * The small image URI stored by NFTScan (null if not stored by NFTScan)
   */
  small_nftscan_uri: string;
  /**
   * The token ID of the NFT in Number
   */
  token_id: string;
  /**
   * The token URI
   */
  token_uri: string;
}
