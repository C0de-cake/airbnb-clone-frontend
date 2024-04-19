import {BathsVO, BedroomsVO, BedsVO, DescriptionVO, GuestsVO, PriceVO, TitleVO} from "./listing-vo.model";
import {CategoryName} from "../../layout/navbar/category/category.model";
import {NewListingPicture} from "./picture.model";

export interface NewListingInfo {
  guests: GuestsVO,
  bedrooms: BedroomsVO,
  beds: BedsVO,
  baths: BathsVO
}

export interface NewListing {
  category: CategoryName,
  location: string,
  infos: NewListingInfo,
  pictures: Array<NewListingPicture>,
  description: Description,
  price: PriceVO
}

export interface Description {
  title: TitleVO,
  description: DescriptionVO
}

export interface CreatedListing {
  publicId: string
}
