import type { FC } from 'react';

import { Tabs } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

import { addTag, removeTag, setActiveTag } from '../../../stores/tags-view.store';

import TagsViewAction from './tagViewAction';

const TagsView: FC = () => {
  const { tags, activeTagId } = useSelector(state => state.tagsView);
  const { menuList, locale } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); 

  // Ensure paths keep `/dashboard/`
  const fixPath = (path) => (path.startsWith("/dashboard") ? path : `/dashboard${path}`);
  const removePath = (path) => (path.startsWith("/dashboard") ? path.replace("/dashboard", "") : path);

  //console.log("tagVew/index location=" + location.pathname);

  // onClick tag
  const onChange = (key: string) => {
    //console.log("tagVew/index onChange()[key]=" + key);
    const tag = tags.find(tag => fixPath(tag.path) === fixPath(key));
    //console.log("tagVew/index[tag.path]=" + tag.path);
    if (tag) {
      setCurrentTag(tag.path);
    }
  };

  // onRemove tag
  /*
  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey));
  };
  */

  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey));
  
    const remainingTabs = tags.filter((tag) => tag.path !== targetKey);
    if (remainingTabs.length > 0) {
      const lastTab = remainingTabs[remainingTabs.length - 1];

      //console.log("tagVew/index onClose()[lastTab.path]=" + lastTab.path);
      
      navigate(lastTab.path);
    } else {
      // If no tabs left it can go to / because it will be /dashboard
      navigate('/'); // If no tabs left, go to `/dashboard`
    }
  };

  /*
  const setCurrentTag = useCallback(
    (id?: string) => {
      const tag = tags.find(item => {
        if (id) {
          return item.path === id;
        } else {
          return item.path === location.pathname;
        }
      });

      if (tag) {
        dispatch(setActiveTag(tag.path));
      }
    },
    [dispatch, location.pathname, tags],
  );
  */
 
  const setCurrentTag = useCallback(
    (id?: string) => {
      //console.log("setCurrentTag called with id =", id);
      //console.log("Current location.pathname =", location.pathname);
      
      // Loop through tags and log each path
      for (const item of tags) {
        //console.log("Checking tag:", item.path);
      }
  
      let tag;
      if (id) {
        // Case 1: Looking for a tag by id
        tag = tags.find((item) => {
          //console.log(`Comparing ${item.path} === ${id}`);
          return item.path === id;
        });
      } else {
        // Case 2: Looking for a tag by location.pathname
        tag = tags.find((item) => {
          //console.log(`Comparing ${item.path} === ${location.pathname}`);
          return item.path === location.pathname;
        });
      }
  
      if (tag) {
        //console.log("Found tag:", tag.path);
        dispatch(setActiveTag(tag.path)); // Update Redux state
        navigate(tag.path);               // Go to the selected tag
      } else {
        //console.log("No matching tag found.");
      }
    },
    [dispatch, location.pathname, tags]
  );
  

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find(m => m.path === location.pathname);

      if (menu) {
        dispatch(
          addTag({
            ...menu,
            closable: menu.code !== 'dashboard',
          }),
        );
      }
    }
  }, [dispatch, fixPath(location.pathname), menuList]);

  return (
    <div id="pageTabs" style={{ padding: '6px 4px' }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) => action === 'remove' && onClose(targetKey as string)}
        tabBarExtraContent={<TagsViewAction />}
        items={tags.map(tag => {
          return {
            key: tag.path,
            closable: tag.closable,
            label: tag.label[locale],
          };
        })}
      />
    </div>
  );
};

export default TagsView;
