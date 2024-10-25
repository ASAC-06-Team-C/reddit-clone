import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function CommentSerachBar({ setSearchState, searchState }) {
  const handleSearchInput = () => {
    setSearchState(false)
  }

  const handleSearchButton = () => {
    setSearchState(true)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {searchState ? (
        <Input
          type='text'
          placeholder='Search Comments'
          onClick={handleSearchInput}
          style={{ width: 'auto', textAlign: 'center' }}
        />
      ) : (
        <>
          <Input
            type='text'
            placeholder='Search Comments'
            style={{ width: '460px', marginRight: '10px' }}
          />
          <Button onClick={handleSearchButton}>Cancel</Button>
        </>
      )}
    </div>
  )
}

export default CommentSerachBar
