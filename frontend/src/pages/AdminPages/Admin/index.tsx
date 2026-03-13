import { HomeAdmin } from '../../../components/HomeAdmin';
import { MainTemplateAdmin } from '../../../templates/MainTemplateAdmin';

export function Admin() {
  return (
    <MainTemplateAdmin>
      <HomeAdmin />
    </MainTemplateAdmin>
  );
}
