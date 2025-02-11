import { checkAuthLoader } from '../utils/auth';
import { loader as shopLoader } from './shopLoader';

export async function HomePageLoaders() {
  const authCheck = checkAuthLoader();
  if (authCheck instanceof Response) {
    return authCheck; // Return redirect response immediately
  }
  const shopData = await shopLoader();
  return shopData;
}