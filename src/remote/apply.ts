import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore';

import { store } from './firebase';
import { ApplyValues } from '@models/apply';
import { COLLECTIONS } from '@constants';

export async function applyCard(applyValues: ApplyValues) {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues);
}

export async function updateApplyCard({
  userId,
  cardId,
  applyValues
}: {
  userId: string;
  cardId: string;
  applyValues: Partial<ApplyValues>;
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId)
    )
  );

  const [applied] = snapshot.docs;

  updateDoc(applied.ref, applyValues);
}
