import { useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import { flatten } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import { getCards } from '@remote/card';

import ListRow from '@shared/ListRow';
import Badge from '@shared/Badge';

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam);
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible;
      }
    }
  );

  const navigate = useNavigate();

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  if (data === undefined) {
    return null;
  }

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={card.payback ? <Badge label={card.payback} /> : null}
                withArrow={true}
                onClick={() => navigate(`/card/${card.id}`)}
              />
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default CardList;
