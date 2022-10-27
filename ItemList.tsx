import { Item } from "./type";
import styled from "styled-components";
import { SingleItem } from "./SingleItem";
import { FlexWidthHeight100Centered } from "./components/styled/containers";

export interface ItemListProps {
    items: Item[],
    projectId: string;
    onEditItem: (item: Item) => void;
    onDeleteItem: (projectId: string) => void;
}

const Container = styled.div`
    width: 100%;
`;

const ItemListContainer = styled.ul`
    list-style-type: none;
    padding: 10px;
`

export const ItemList = (props: ItemListProps) => {
    const sortedItems = props.items.sort((a, b) => new Date(b.unlockDate).getTime() - new Date(a.unlockDate).getTime());

    return <Container>
        <h2>Items</h2>
        {props.items.length === 0 ? <FlexWidthHeight100Centered>
            <p>No items yet</p>
        </FlexWidthHeight100Centered> :
            <ItemListContainer>
                {sortedItems.map(item => {
                    return <li key={item._id} style={{ marginBottom: 5 }}>
                        <SingleItem item={item} onEditItem={props.onEditItem} onDeleteItem={() => props.onDeleteItem(item._id)} />
                    </li>
                })}
            </ItemListContainer>}
    </Container>;
};
