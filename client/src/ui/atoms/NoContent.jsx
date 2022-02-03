import noContent from "../../assets/no_content.png"
import {styled} from '@mui/system';
import {Box} from '@mui/material';
import {theme} from "../../theme"
import * as React from "react";
import {Button} from "./Button"

const StyledNoContentParagraph = styled('p')({
    color: `rgba(${theme.palette.text.secondary},0.5)`
})
export const NoContent = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <img src={noContent} alt="no content"/>
            <StyledNoContentParagraph>Brak danych do wyświetlenia</StyledNoContentParagraph>
          <Button variant="outlined" color="primary" startIcon>Hej</Button>
        </Box>
    )
};
