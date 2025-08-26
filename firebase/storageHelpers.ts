import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export async function uploadFile(path: string, file: File | Blob) {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}

export async function getFileUrl(path: string) {
  const fileRef = ref(storage, path);
  return await getDownloadURL(fileRef);
}

export async function deleteFile(path: string) {
  const fileRef = ref(storage, path);
  await deleteObject(fileRef);
}