export interface User {
    id: number;
    access_token: string;
    home: {
        lat: number;
        lng: number;
    };
    tracker: {
        id: number;
        status: number;
    }
}