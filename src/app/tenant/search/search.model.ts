import {BookedDatesDTOFromServer} from "../model/booking.model";
import {NewListingInfo} from "../../landlord/model/listing.model";

export interface Search {
  location: string,
  dates: BookedDatesDTOFromServer,
  infos: NewListingInfo
}
