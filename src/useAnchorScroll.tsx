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

    const handleClickMenu = (e) => {
        e.preventDefault();
        const dataId = e.currentTarget.getAttribute('data-id');
        const element = document.getElementById(dataId);

        if (element) {
            const container = document.getElementById(containerId);
            const sections = container?.querySelectorAll(`.${sectionClass}`);

            if (container && sections) {
                // 检查是否点击的是最后一个部分
                if (dataId === (sections[sections.length - 1] as HTMLElement).id) {
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
            }
        }
    };

    useLayoutEffect(() => {
        if (window.location.hash) {
            const hashId = window.location.hash.replace(/^#/, '');
            document.getElementById(hashId)?.scrollIntoView({
                behavior: hashBehavior as ScrollBehavior,
            });
            dataIdRef.current = hashId;
            setSectionId(hashId);
        }
    }, [hashBehavior]);

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
                let newSectionId = sectionId;
                let sectionChanged = false;

                sections.forEach((item) => {
                    const offsetTop = (item as any).offsetTop;
                    const offsetHeight = (item as any).offsetHeight;

                    if (
                        currentTop >= offsetTop &&
                        currentTop < offsetTop + offsetHeight
                    ) {
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

                if (currentTop + containerHeight >= scrollHeight) {
                    const lastSection = sections[sections.length - 1];
                    if (newSectionId !== lastSection.id) {
                        newSectionId = lastSection.id;
                        sectionChanged = true;
                    }
                }

                if (sectionChanged) {
                    setSectionId(newSectionId);
                    dataIdRef.current = newSectionId;
                    window.location.hash = newSectionId;
                }
            },
            () => {
                // 这个回调函数可以被移除，因为已经在 handleScroll 中处理了
            },
            scrollDelay
        );

        return () => {
            el.removeEventListener('scroll', listener);
        };
    }, [handleContentScroll, containerId, sectionClass, activeClass, scrollDelay, sectionId]);

    return [sectionId, handleClickMenu as any];
}