import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './PhoneLauncher.module.scss';

export interface IPhoneLauncherProps {
  phoneNbr: string;
}

const LOG_SOURCE: string = 'PhoneLauncher';

export default class PhoneLauncher extends React.Component<IPhoneLauncherProps, {}> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: PhoneLauncher mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: PhoneLauncher unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    console.log('test');
    const launchPhone = () => (
      <a href={`tel:${this.props.phoneNbr}`}>
        <div className="ms-Icon ms-Icon--Phone"></div> 
      </a>
    );
    return (
      <div className={styles.cell}>
        { launchPhone() }
        &nbsp;
        { this.props.phoneNbr }
      </div>
    );
  }  
}
