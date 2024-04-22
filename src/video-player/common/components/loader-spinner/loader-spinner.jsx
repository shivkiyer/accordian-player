import styles from './loader-spinner.module.scss';

export default function LoaderSpinner() {
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles['lds-ring']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
