export interface IGalleryImage {
    thumbnail: string,
    full: string,
    hdr: null
}

interface ILocation {
    id: number,
    name: string;
}

interface ITitle {
    type: string;
    name: string;
    copartNotes: string;
}

export interface ILot {
    description: string;
    locationCountry: string;
    id: number;
    location: ILocation;
    lane: string;
    item: string;
    gridRow: string;
    saleDate: Date;
    images: IGalleryImage[],
    vin: string;
    title: ITitle;
    odometer: string;
    odometerBrand: string;
    primaryDamage: string;
    bodyStyle: string;
    vehicleType: string;
    color: string;
    engineSize: string;
    bidStatus: string;
    saleStatusString: string;
    currencySymbol: string;
    currentBid: number;
    currency: string;
}