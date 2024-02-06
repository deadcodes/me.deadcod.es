import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import '../fonts/Monoton-Regular.ttf'

import  { Redirect } from 'react-router-dom';

function HomepageHeader() {
  return (<Redirect to='/category/scripts' />);
}

export default function Home(): JSX.Element {
  return (
    <Layout>
      <main>
      <HomepageHeader />
      </main>
    </Layout>
  );
}
