import clsx from 'clsx';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';


const rootElement = document.getElementById('root') as HTMLDivElement;
const reactRoot = createRoot(rootElement);

const App = () => {
  const [activeArticleStyles, setActiveArticleStyles] = useState(defaultArticleState);
  const [editingArticleStyles, setEditingArticleStyles] = useState(defaultArticleState);

  const handleResetStyles = () => {
    setEditingArticleStyles(defaultArticleState);
    setActiveArticleStyles(defaultArticleState);
  };

  const handleApplyStyles = () => {
    setActiveArticleStyles(editingArticleStyles);
  };

  const currentStyles: CustomCSSProperties = {
    '--font-family': activeArticleStyles.fontFamilyOption.value,
    '--font-size': activeArticleStyles.fontSizeOption.value,
    '--font-color': activeArticleStyles.fontColor.value,
    '--container-width': activeArticleStyles.contentWidth.value,
    '--bg-color': activeArticleStyles.backgroundColor.value,
  };

  return (
    <div className={clsx(styles.main)} style={currentStyles}>
      <ArticleParamsForm
        currentStyles={editingArticleStyles}
        setCurrentStyles={setEditingArticleStyles}
        resetStyles={handleResetStyles}
        applyStyles={handleApplyStyles}/>

      <Article />
    </div>
  );
};

reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>
);