import moment from 'moment';

import { dateString } from '~constants/formatString';

export default function formatDate(value, formatString = dateString.STANDARD) {
  if (!value) return '';

  return moment(value).format(formatString);
}
