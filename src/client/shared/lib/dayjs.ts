import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('ru');
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default dayjs;
