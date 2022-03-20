export interface Member {
  id: number;
  username: string;
  age: number;
  knownAs: string;
  profileRegistered: Date;
  lastActive: Date;
  gender: string;
  photoUrl: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
}

export interface Photo{
  id:number;
  url: string;
  isMain: boolean;
}
