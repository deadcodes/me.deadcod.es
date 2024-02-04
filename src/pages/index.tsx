import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import '../fonts/Monoton-Regular.ttf'
import {
  FluentProvider,
  webDarkTheme,
} from "@fluentui/react-components";
import  { Redirect } from 'react-router-dom';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (<Redirect to='/category/scripts' />);
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
