export interface PostInfo {
  id: string;
  title: string;
  imageUrl: string;
  imageList: string[];
  author: string;
  authorAvatar?: string;
  description?: string;
  status?: string; // actually an enum ... modify later ...
}
