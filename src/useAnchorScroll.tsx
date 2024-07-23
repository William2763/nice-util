import { useState, useRef, useCallback, useLayoutEffect } from 'react';

export default function useAnchorScroll({
    containerId = 'innerContent',
    sectionClass = 'section',
    defaultSectionId = 'section-1',
    activeClass = 'active',
    scrollDelay = 200,
    hashBehavior = 'smooth' // 这里 hashBehavior 的默认值是 'smooth'
} = {}) {
    const [sectionId, setSectionId] = useState(defaultSectionId);
    const dataIdRef = useRef('');
    const lastScrollTopRef = useRef(0);

    const updateActiveSection = (container, sections, currentTop, containerHeight, scrollHeight) => {
        let newSectionId = sectionId;
        let sectionChanged = false;

        sections.forEach((item) => {
            const offsetTop = (item as HTMLElement).offsetTop;
            const offsetHeight = (item as HTMLElement).offsetHeight;

            if (currentTop + containerHeight >= scrollHeight) {
                const lastSection = sections[sections.length - 1];
                if (newSectionId !== lastSection.id) {
                    newSectionId = lastSection.id;
                    sectionChanged = true;
                }
            } else if (currentTop >= offsetTop && currentTop < offsetTop + offsetHeight) {
                document
                    .querySelector(`[data-id=${item.id}]`)
                    ?.classList.add(activeClass);

                if (newSectionId !== item.id) {
                    newSectionId = item.id;
                    sectionChanged = true;
                }
            } else {
                document
                    .querySelector(`[data-id=${item.id}]`)
                    ?.classList.remove(activeClass);
            }
        });

        // 判断滚动方向，如果是向下滚动才更新 sectionId
        if (sectionChanged && currentTop > lastScrollTopRef.current) {
            setSectionId(newSectionId);
            dataIdRef.current = newSectionId;
            window.location.hash = newSectionId;
        }

        lastScrollTopRef.current = currentTop; // 更新上次的滚动位置
    };

    const handleClickMenu = (e) => {
        e.preventDefault();
        const dataId = e.currentTarget.getAttribute('data-id');
        const element = document.getElementById(dataId);

        if (element) {
            const container = document.getElementById(containerId);
            const sections = container?.querySelectorAll(`.${sectionClass}`);

            if (container && sections) {
                // 清除之前的高亮
                document.querySelectorAll(`.${activeClass}`).forEach((el) => {
                    el.classList.remove(activeClass);
                });

                // 更新当前点击项的高亮
                document
                    .querySelector(`[data-id=${dataId}]`)
                    ?.classList.add(activeClass);

                // 确保高亮更新后再滚动
                requestAnimationFrame(() => {
                if (dataId === (sections[sections.length - 1] as HTMLElement).id) {
                    // 滚动到底部
                    container.scrollTo({
                        top: container.scrollHeight,
                        behavior: hashBehavior as ScrollBehavior,
                    });
                } else {
                    element.scrollIntoView({
                        behavior: hashBehavior as ScrollBehavior,
                    });
                }

                dataIdRef.current = dataId;
                setSectionId(dataId);
                window.location.hash = dataId;
              });
            }
        }
    };

    const handleContentScroll = useCallback((el, handleScroll, delayCallback, delay) => {
        let isScrolling;
        const listener = (e) => {
            e.preventDefault();
            if (isScrolling) window.clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                delayCallback();
            }, delay || 100);
            handleScroll();
        };
        el.addEventListener('scroll', listener, false);
        return [el, listener];
    }, []);

    useLayoutEffect(() => {
        const innerContent = document.getElementById(containerId);
        if (!innerContent) return;

        const [el, listener] = handleContentScroll(
            innerContent,
            () => {
                const currentTop = innerContent.scrollTop;
                const containerHeight = innerContent.clientHeight;
                const scrollHeight = innerContent.scrollHeight;
                const sections = innerContent.querySelectorAll(`.${sectionClass}`);

                updateActiveSection(innerContent, sections, currentTop, containerHeight, scrollHeight);
            },
            null,
            scrollDelay
        );

        return () => {
            el.removeEventListener('scroll', listener);
        };
    }, [handleContentScroll, containerId, sectionClass, activeClass, scrollDelay, sectionId]);

    return [sectionId, handleClickMenu as any];
}