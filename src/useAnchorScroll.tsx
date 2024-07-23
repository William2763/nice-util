import { useState, useRef, useCallback, useLayoutEffect } from 'react';

export default function useAnchorScroll({
    containerId = 'innerContent', // 滚动容器的ID
    sectionClass = 'section', // 每个部分的CSS类名
    defaultSectionId = 'section-1', // 默认激活的部分ID
    activeClass = 'active', // 激活状态的CSS类名
    scrollDelay = 200, // 滚动延迟
    hashBehavior = 'smooth' // 滚动行为，默认是平滑滚动
} = {}) {
    const [sectionId, setSectionId] = useState(defaultSectionId); // 当前激活的部分ID
    const dataIdRef = useRef(''); // 用于存储当前部分ID的引用
    const lastScrollTopRef = useRef(0); // 上次滚动位置的引用

    // 更新激活部分的方法
    const updateActiveSection = (container, sections, currentTop, containerHeight, scrollHeight) => {
        let newSectionId = sectionId; // 新的部分ID，初始为当前部分ID
        let sectionChanged = false; // 部分是否发生变化的标志

        sections.forEach((item) => {
            const offsetTop = item.offsetTop; // 当前部分的顶部偏移量
            const offsetHeight = item.offsetHeight; // 当前部分的高度

            if (currentTop + containerHeight >= scrollHeight) {
                // 如果滚动到底部，则激活最后一个部分
                const lastSection = sections[sections.length - 1];
                if (newSectionId !== lastSection.id) {
                    newSectionId = lastSection.id;
                    sectionChanged = true;
                }
            } else if (currentTop >= offsetTop && currentTop < offsetTop + offsetHeight) {
                // 如果当前滚动位置在部分范围内，则激活该部分
                document
                    .querySelector(`[data-id=${item.id}]`)
                    ?.classList.add(activeClass);

                if (newSectionId !== item.id) {
                    newSectionId = item.id;
                    sectionChanged = true;
                }
            } else {
                // 否则移除激活状态
                document
                    .querySelector(`[data-id=${item.id}]`)
                    ?.classList.remove(activeClass);
            }
        });

        // 如果部分发生变化并且是向下滚动，则更新状态
        if (sectionChanged && currentTop > lastScrollTopRef.current) {
            setSectionId(newSectionId);
            dataIdRef.current = newSectionId;
            window.location.hash = newSectionId;
        }

        lastScrollTopRef.current = currentTop; // 更新上次滚动位置
    };

    // 菜单点击处理方法
    const handleClickMenu = (e) => {
        e.preventDefault();
        const dataId = e.currentTarget.getAttribute('data-id'); // 获取点击的部分ID
        const element = document.getElementById(dataId);

        if (element) {
            const container = document.getElementById(containerId); // 获取滚动容器
            const sections = container?.querySelectorAll(`.${sectionClass}`);

            if (container && sections) {
                // 移除所有部分的激活状态
                document.querySelectorAll(`.${activeClass}`).forEach((el) => {
                    el.classList.remove(activeClass);
                });

                // 激活点击的部分
                document
                    .querySelector(`[data-id=${dataId}]`)
                    ?.classList.add(activeClass);

                requestAnimationFrame(() => {
                  if (dataId === sections[sections.length - 1].id) {
                  // 如果点击的是最后一个部分，滚动到底部
                    container.scrollTo({
                        top: container.scrollHeight,
                        behavior: hashBehavior as ScrollBehavior,
                    });
                } else {
                    // 否则滚动到对应部分
                    element.scrollIntoView({
                        behavior: hashBehavior as ScrollBehavior,
                    });
                }

                  dataIdRef.current = dataId; // 更新当前部分ID引用
                  setSectionId(dataId); // 更新状态
                  window.location.hash = dataId; // 更新URL的哈希
              });
            }
        }
    };

    // 内容滚动处理方法
    const handleContentScroll = useCallback((el, handleScroll, delayCallback, delay) => {
        let isScrolling;
        const listener = (e) => {
            e.preventDefault();
            if (isScrolling) window.clearTimeout(isScrolling); // 如果正在滚动，清除计时器
            isScrolling = setTimeout(() => {
                delayCallback(); // 滚动结束后的回调
            }, delay || 100);
            handleScroll(); // 处理滚动
        };
        el.addEventListener('scroll', listener, false); // 添加滚动事件监听
        return [el, listener];
    }, []);

    // 组件挂载后的效果
    useLayoutEffect(() => {
        const innerContent = document.getElementById(containerId); // 获取滚动容器
        if (!innerContent) return;

        const [el, listener] = handleContentScroll(
            innerContent,
            () => {
                const currentTop = innerContent.scrollTop; // 当前滚动位置
                const containerHeight = innerContent.clientHeight; // 容器高度
                const scrollHeight = innerContent.scrollHeight; // 滚动高度
                const sections = innerContent.querySelectorAll(`.${sectionClass}`); // 获取所有部分

                updateActiveSection(innerContent, sections, currentTop, containerHeight, scrollHeight); // 更新激活部分
            },
            null,
            scrollDelay // 滚动延迟
        );

        return () => {
            el.removeEventListener('scroll', listener); // 移除滚动事件监听
        };
    }, [handleContentScroll, containerId, sectionClass, activeClass, scrollDelay, sectionId]);

    return [sectionId, handleClickMenu]; // 返回当前部分ID和菜单点击处理方法
}