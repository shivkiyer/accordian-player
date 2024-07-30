import VideoDataType from "./video-data";

export default interface HttpResponseType {
  data: string | VideoDataType | null;
  errMsg: string | null;
}

export {};
