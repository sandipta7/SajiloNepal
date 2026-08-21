import { db, storage } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';

const ISSUES_COLLECTION = 'issues';
const NOTIFS_COLLECTION = 'notifications';

/**
 * Upload an image (File or base64 data URL) to Firebase Storage with a strict 2-second timeout
 * and robust fallback to optimized base64.
 */
export async function uploadImageToStorage(fileOrDataUrl, pathPrefix = 'issues') {
  if (!fileOrDataUrl) return null;

  // If already a remote URL (e.g. Unsplash, HTTP), return directly
  if (typeof fileOrDataUrl === 'string' && (fileOrDataUrl.startsWith('http://') || fileOrDataUrl.startsWith('https://'))) {
    return fileOrDataUrl;
  }

  const filename = `${pathPrefix}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Wrap upload with a 2-second timeout race to prevent UI freeze
  const storageUploadTask = async () => {
    try {
      const storageRef = ref(storage, filename);

      if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:')) {
        const snapshot = await uploadString(storageRef, fileOrDataUrl, 'data_url');
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
      } else if (fileOrDataUrl instanceof File || fileOrDataUrl instanceof Blob) {
        const snapshot = await uploadBytes(storageRef, fileOrDataUrl);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
      }
    } catch (error) {
      console.warn('Firebase Storage upload notice (using secure inline fallback):', error);
      return typeof fileOrDataUrl === 'string' ? fileOrDataUrl : null;
    }
  };

  const timeoutFallback = new Promise((resolve) => {
    setTimeout(() => {
      resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : null);
    }, 2000);
  });

  try {
    const result = await Promise.race([storageUploadTask(), timeoutFallback]);
    return result || (typeof fileOrDataUrl === 'string' ? fileOrDataUrl : null);
  } catch {
    return typeof fileOrDataUrl === 'string' ? fileOrDataUrl : null;
  }
}

/**
 * Listen to real-time issues collection in Firestore
 */
export function subscribeToIssues(onUpdate, onError) {
  try {
    const issuesRef = collection(db, ISSUES_COLLECTION);
    const q = query(issuesRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const issues = [];
        snapshot.forEach((docSnap) => {
          issues.push({ id: docSnap.id, ...docSnap.data() });
        });
        onUpdate(issues);
      },
      (error) => {
        console.warn('Firestore issues snapshot notice:', error);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.warn('Failed to setup issues subscription:', error);
    return () => {};
  }
}

/**
 * Save / update an issue in Firestore
 */
export async function saveIssueToFirestore(issue) {
  try {
    const docRef = doc(db, ISSUES_COLLECTION, issue.id);
    await setDoc(docRef, {
      ...issue,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('Notice saving issue to Firestore:', error);
    return false;
  }
}

/**
 * Batch initialize / seed default issues if collection is empty
 */
export async function seedInitialIssuesIfEmpty(initialIssues) {
  try {
    const issuesRef = collection(db, ISSUES_COLLECTION);
    const snapshot = await getDocs(issuesRef);
    if (snapshot.empty && initialIssues && initialIssues.length > 0) {
      for (const issue of initialIssues) {
        const docRef = doc(db, ISSUES_COLLECTION, issue.id);
        await setDoc(docRef, issue);
      }
    }
  } catch (error) {
    console.warn('Firestore seeding check notice:', error);
  }
}

/**
 * Update issue fields in Firestore
 */
export async function updateIssueInFirestore(issueId, updates) {
  try {
    const docRef = doc(db, ISSUES_COLLECTION, issueId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.warn('Notice updating issue in Firestore:', error);
    return false;
  }
}

/**
 * Listen to real-time notifications collection in Firestore
 */
export function subscribeToNotifications(onUpdate, onError) {
  try {
    const notifsRef = collection(db, NOTIFS_COLLECTION);
    const q = query(notifsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notifs = [];
        snapshot.forEach((docSnap) => {
          notifs.push({ id: docSnap.id, ...docSnap.data() });
        });
        onUpdate(notifs);
      },
      (error) => {
        console.warn('Firestore notifications snapshot notice:', error);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.warn('Failed to setup notifications subscription:', error);
    return () => {};
  }
}

/**
 * Save notification to Firestore
 */
export async function saveNotificationToFirestore(notif) {
  try {
    const docRef = doc(db, NOTIFS_COLLECTION, notif.id);
    await setDoc(docRef, {
      ...notif,
      createdAt: new Date().toISOString(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('Notice saving notification to Firestore:', error);
    return false;
  }
}

/**
 * Update notification fields in Firestore
 */
export async function updateNotificationInFirestore(notifId, updates) {
  try {
    const docRef = doc(db, NOTIFS_COLLECTION, notifId);
    await updateDoc(docRef, updates);
    return true;
  } catch (error) {
    console.warn('Notice updating notification in Firestore:', error);
    return false;
  }
}
